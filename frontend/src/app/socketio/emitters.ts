import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import dateFormat from 'dateformat';
import { Socket } from 'socket.io-client';
import {
  frontendToBackendParameters,
  FrontendToBackendParametersConfig,
} from '../../common/util/parameterTranslation';
import {
  GalleryCategory,
  GalleryState,
  removeImage,
} from '../../features/gallery/gallerySlice';
import { OptionsState } from '../../features/options/optionsSlice';
import {
  addLogEntry,
  errorOccurred,
  modelChangeRequested,
  setIsProcessing,
} from '../../features/system/systemSlice';
import { inpaintingImageElementRef } from '../../features/tabs/Inpainting/InpaintingCanvas';
import { InvokeTabName } from '../../features/tabs/InvokeTabs';
import * as InvokeAI from '../invokeai';
import { RootState } from '../store';

/**
 * Returns an object containing all functions which use `socketio.emit()`.
 * i.e. those which make server requests.
 */
const makeSocketIOEmitters = (
  store: MiddlewareAPI<Dispatch<AnyAction>, any>,
  socketio: Socket
) => {
  // We need to dispatch actions to redux and get pieces of state from the store.
  const { dispatch, getState } = store;

  return {
    emitGenerateImage: (generationMode: InvokeTabName) => {
      dispatch(setIsProcessing(true));

      const state: RootState = getState();

      const {
        options: optionsState,
        system: systemState,
        inpainting: inpaintingState,
        gallery: galleryState,
      } = state;

      const frontendToBackendParametersConfig: FrontendToBackendParametersConfig =
        {
          generationMode,
          optionsState,
          inpaintingState,
          systemState,
        };

      if (generationMode === 'inpainting') {
        if (
          !inpaintingImageElementRef.current ||
          !inpaintingState.imageToInpaint?.url
        ) {
          dispatch(
            addLogEntry({
              timestamp: dateFormat(new Date(), 'isoDateTime'),
              message: 'Inpainting image not loaded, cannot generate image.',
              level: 'error',
            })
          );
          dispatch(errorOccurred());
          return;
        }

        frontendToBackendParametersConfig.imageToProcessUrl =
          inpaintingState.imageToInpaint.url;

        frontendToBackendParametersConfig.maskImageElement =
          inpaintingImageElementRef.current;
      } else if (!['txt2img', 'img2img'].includes(generationMode)) {
        if (!galleryState.currentImage?.url) return;

        frontendToBackendParametersConfig.imageToProcessUrl =
          galleryState.currentImage.url;
      }

      const { generationParameters, esrganParameters, facetoolParameters } =
        frontendToBackendParameters(frontendToBackendParametersConfig);

      socketio.emit(
        'generateImage',
        generationParameters,
        esrganParameters,
        facetoolParameters
      );

      // we need to truncate the init_mask base64 else it takes up the whole log
      // TODO: handle maintaining masks for reproducibility in future
      if (generationParameters.init_mask) {
        generationParameters.init_mask = generationParameters.init_mask
          .substr(0, 20)
          .concat('...');
      }

      dispatch(
        addLogEntry({
          timestamp: dateFormat(new Date(), 'isoDateTime'),
          message: `Image generation requested: ${JSON.stringify({
            ...generationParameters,
            ...esrganParameters,
            ...facetoolParameters,
          })}`,
        })
      );
    },
    emitRunESRGAN: (imageToProcess: InvokeAI.Image) => {
      dispatch(setIsProcessing(true));
      const options: OptionsState = getState().options;
      const { upscalingLevel, upscalingStrength } = options;
      const esrganParameters = {
        upscale: [upscalingLevel, upscalingStrength],
      };
      socketio.emit('runPostprocessing', imageToProcess, {
        type: 'esrgan',
        ...esrganParameters,
      });
      dispatch(
        addLogEntry({
          timestamp: dateFormat(new Date(), 'isoDateTime'),
          message: `ESRGAN upscale requested: ${JSON.stringify({
            file: imageToProcess.url,
            ...esrganParameters,
          })}`,
        })
      );
    },
    emitRunFacetool: (imageToProcess: InvokeAI.Image) => {
      dispatch(setIsProcessing(true));
      const options: OptionsState = getState().options;
      const { facetoolType, facetoolStrength, codeformerFidelity } = options;

      const facetoolParameters: Record<string, any> = {
        facetool_strength: facetoolStrength,
      };

      if (facetoolType === 'codeformer') {
        facetoolParameters.codeformer_fidelity = codeformerFidelity;
      }

      socketio.emit('runPostprocessing', imageToProcess, {
        type: facetoolType,
        ...facetoolParameters,
      });
      dispatch(
        addLogEntry({
          timestamp: dateFormat(new Date(), 'isoDateTime'),
          message: `Face restoration (${facetoolType}) requested: ${JSON.stringify(
            {
              file: imageToProcess.url,
              ...facetoolParameters,
            }
          )}`,
        })
      );
    },
    emitDeleteImage: (imageToDelete: InvokeAI.Image) => {
      const { url, uuid, category } = imageToDelete;
      dispatch(removeImage(imageToDelete));
      socketio.emit('deleteImage', url, uuid, category);
    },
    emitRequestImages: (category: GalleryCategory) => {
      const gallery: GalleryState = getState().gallery;
      const { earliest_mtime } = gallery.categories[category];
      socketio.emit('requestImages', category, earliest_mtime);
    },
    emitRequestNewImages: (category: GalleryCategory) => {
      const gallery: GalleryState = getState().gallery;
      const { latest_mtime } = gallery.categories[category];
      socketio.emit('requestLatestImages', category, latest_mtime);
    },
    emitCancelProcessing: () => {
      socketio.emit('cancel');
    },
    emitUploadImage: (payload: InvokeAI.UploadImagePayload) => {
      const { file, destination } = payload;
      socketio.emit('uploadImage', file, file.name, destination);
    },
    emitUploadMaskImage: (file: File) => {
      socketio.emit('uploadMaskImage', file, file.name);
    },
    emitRequestSystemConfig: () => {
      socketio.emit('requestSystemConfig');
    },
    emitRequestModelChange: (modelName: string) => {
      dispatch(modelChangeRequested());
      socketio.emit('requestModelChange', modelName);
    },
  };
};

export default makeSocketIOEmitters;
