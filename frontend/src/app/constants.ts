// TODO: use Enums?

// Valid samplers
export const SAMPLERS: Array<string> = [
  'ddim',
  'plms',
  'k_lms',
  'k_dpm_2',
  'k_dpm_2_a',
  'k_euler',
  'k_euler_a',
  'k_heun',
];

// Valid image widths
export const WIDTHS: Array<number> = [
  64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960,
  1024, 1088, 1152, 1216, 1280, 1344, 1408, 1472, 1536, 1600, 1664, 1728, 1792,
  1856, 1920, 1984, 2048,
];

// Valid image heights
export const HEIGHTS: Array<number> = [
  64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960,
  1024, 1088, 1152, 1216, 1280, 1344, 1408, 1472, 1536, 1600, 1664, 1728, 1792,
  1856, 1920, 1984, 2048,
];

// Valid upscaling levels
export const UPSCALING_LEVELS: Array<{ key: string; value: number }> = [
  { key: '2x', value: 2 },
  { key: '4x', value: 4 },
];

// Internal to human-readable parameters
export const PARAMETERS: { [key: string]: string } = {
  prompt: 'Prompt',
  iterations: 'Iterations',
  steps: 'Steps',
  cfgScale: 'CFG Scale',
  height: 'Height',
  width: 'Width',
  sampler: 'Sampler',
  seed: 'Seed',
  img2imgStrength: 'img2img Strength',
  gfpganStrength: 'GFPGAN Strength',
  upscalingLevel: 'Upscaling Level',
  upscalingStrength: 'Upscaling Strength',
  initialImagePath: 'Initial Image',
  maskPath: 'Initial Image Mask',
  shouldFitToWidthHeight: 'Fit Initial Image',
  seamless: 'Seamless Tiling',
  hiresFix: 'High Resolution Optimizations',
};

export const NUMPY_RAND_MIN = 0;

export const NUMPY_RAND_MAX = 4294967295;
