import { Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector } from '../../app/store';
import { RootState } from '../../app/store';
import { SDState } from '../../features/sd/sdSlice';
import './InitAndMaskImage.css';
import { createSelector } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import InitAndMaskUploadButtons from './InitAndMaskUploadButtons';

const sdSelector = createSelector(
  (state: RootState) => state.sd,
  (sd: SDState) => {
    return {
      initialImagePath: sd.initialImagePath,
      maskPath: sd.maskPath,
    };
  },
  { memoizeOptions: { resultEqualityCheck: isEqual } }
);

/**
 * Displays init and mask images and buttons to upload/delete them.
 */
const InitAndMaskImage = () => {
  const { initialImagePath, maskPath } = useAppSelector(sdSelector);
  const [shouldShowMask, setShouldShowMask] = useState<boolean>(false);

  return (
    <Flex direction={'column'} alignItems={'center'} gap={2}>
      <InitAndMaskUploadButtons setShouldShowMask={setShouldShowMask} />
      {initialImagePath && (
        <Flex position={'relative'} width={'100%'}>
          <Image
            fit={'contain'}
            src={initialImagePath}
            rounded={'md'}
            className={'checkerboard'}
          />
          {shouldShowMask && maskPath && (
            <Image
              position={'absolute'}
              top={0}
              left={0}
              fit={'contain'}
              src={maskPath}
              rounded={'md'}
              zIndex={1}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default InitAndMaskImage;
