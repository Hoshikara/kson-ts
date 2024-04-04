// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#basic-specifications
export const VERSION = "0.8.0";
export const PULSE_RESOLUTION: uint = 960;

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#top-level-object
export interface kson {
  version: string;
  meta: MetaInfo;
  beat: BeatInfo;
  gauge?: GaugeInfo;
  note?: NoteInfo;
  audio?: AudioInfo;
  camera?: CameraInfo;
  bg?: BGInfo;
  editor?: EditorInfo;
  compat?: CompatInfo;
  impl?: ImplInfo;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#meta
export interface MetaInfo {
  title: string;
  title_translit?: string;
  title_img_filename?: string;
  artist: string;
  artist_translit?: string;
  artist_img_filename?: string;
  chart_author: string;
  difficulty: uint | string;
  level: uint;
  disp_bpm: string;
  std_bpm?: number;
  jacket_filename?: string;
  jacket_author?: string;
  icon_filename?: string;
  information?: string;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#beat
export interface BeatInfo {
  bpm: ByPulse<Pulse>[];
  time_sig: ByMeasureIdx<TimeSig>[];
  scroll_speed: GraphPoint[];
}

export type TimeSig = [numerator: uint, denominator: uint];

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#gauge
export interface GaugeInfo {
  total: uint;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#note
export type ButtonNote = [y: Pulse, length: Pulse];

export type LaserSection = [y: Pulse, v: GraphSectionPoint[], w: uint];

export interface NoteInfo {
  bt?: [
    y: Pulse[] | ButtonNote[],
    y: Pulse[] | ButtonNote[],
    y: Pulse[] | ButtonNote[],
    y: Pulse[] | ButtonNote[]
  ];
  fx?: [y: Pulse[] | ButtonNote[], y: Pulse[] | ButtonNote[]];
  laser?: [LaserSection[], LaserSection[]];
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#audio
export interface AudioInfo {
  bgm?: BGMInfo;
  key_sound?: KeySoundInfo;
  audio_effect?: AudioEffectInfo;
}

export interface BGMInfo {
  filename?: string;
  vol: number;
  offset: int;
  preview?: BPMPreviewInfo;
  legacy?: LegacyBPMInfo;
}

export interface BPMPreviewInfo {
  offset: uint;
  duration: uint;
}

export interface LegacyBPMInfo {
  fp_filenames: string[];
}

export interface KeySoundInfo {
  fx?: KeySoundFXInfo;
  laser?: KeySoundLaserInfo;
}

export interface KeySoundFXInfo {
  chip_event: KeySoundInvokeListFX;
}

export interface KeySoundInvokeListFX {
  [filename: string]: [
    ByPulse<KeySoundInvokeFX>[],
    ByPulse<KeySoundInvokeFX>[]
  ];
}

export interface KeySoundInvokeFX {
  vol: number;
}

export interface KeySoundLaserInfo {
  vol: ByPulse<number>[];
  slam_event?: KeySoundInvokeListLaser;
  legacy?: KeySoundLaserLegacyInfo;
}

export interface KeySoundInvokeListLaser {
  slam_up?: Pulse[];
  slam_down?: Pulse[];
  slam_swing?: Pulse[];
  slam_mute?: Pulse[];
}

export interface KeySoundLaserLegacyInfo {
  vol_auto: boolean;
}

export interface AudioEffectInfo {
  fx?: AudioEffectFXInfo;
  laser?: AudioEffectLaserInfo;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#audioaudio_effectfx
export interface AudioEffectFXInfo {
  def?: Record<string, AudioEffectDef>;
  param_change?: Record<string, Record<string, ByPulse<string>[]>>;
  long_event?: [
    Record<string, uint | ByPulse<Record<string, string>>>[],
    Record<string, uint | ByPulse<Record<string, string>>>[]
  ];
}

export interface AudioEffectLaserInfo {
  def?: Record<string, AudioEffectDef>;
  param_change?: Record<string, Record<string, ByPulse<string>[]>>;
  pulse_event?: Record<string, Pulse[]>;
  peaking_filter_delay: uint;
}

export interface AudioEffectDef {
  type: string;
  v?: Record<string, string>;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#camera
export interface CameraInfo {
  tilt?: TiltInfo;
  cam?: CamInfo;
}

export interface TiltInfo {
  scale: ByPulse<number>[];
  manual?: ByPulse<GraphSectionPoint[]>[];
  keep: ByPulse<boolean>[];
}

export interface CamInfo {
  body?: CamGraphs;
  pattern?: CamPatternInfo;
}

export interface CamGraphs {
  zoom?: GraphPoint[];
  shift_x?: GraphPoint[];
  rotation_x?: GraphPoint[];
  rotation_z?: GraphPoint[];
  center_split?: GraphPoint[];
}

export interface CamPatternInfo {
  laser?: CamPatternLaserInfo;
}

export interface CamPatternLaserInfo {
  slam_event?: CamPatternLaserInvokeList;
}

export interface CamPatternLaserInvokeList {
  spin?: Iterable<CamPatternInvokeSpin>;
  half_spin?: Iterable<CamPatternInvokeSpin>;
  swing?: Iterable<CamPatternInvokeSwing>;
}

export type CamPatternInvokeSpin = [y: Pulse, direction: -1 | 1, length: Pulse];

export type CamPatternInvokeSwing = [
  y: Pulse,
  direction: -1 | 1,
  length: Pulse,
  v?: CamPatternInvokeSpinValue
];

export interface CamPatternInvokeSpinValue {
  scale: number;
  repeat: uint;
  decay_order: uint;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#bg
export interface BGInfo {
  filename?: string;
  offset: int;
  legacy?: LegacyBGInfo;
}

export interface LegacyBGInfo {
  bg?: [KSHBGInfo, KSHBGInfo];
  layer?: KSHLayerInfo;
  movie?: KSHMovieInfo;
}

export interface KSHBGInfo {
  filename?: string;
}

export interface KSHLayerInfo {
  filename?: string;
  duration: int;
  rotation?: KSHLayerRotationInfo;
}

export interface KSHLayerRotationInfo {
  tilt: boolean;
  spin: boolean;
}

export interface KSHMovieInfo {
  filename?: string;
  offset: int;
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#editor-optional-support
export interface EditorInfo {
  app_name?: string;
  app_version?: string;
  comment?: ByPulse<string>[];
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#compat-optional-support
export interface CompatInfo {
  ksh_version?: string;
  ksh_unknown?: KSHUnknownInfo;
}

export interface KSHUnknownInfo {
  meta?: { [name: string]: string };
  option?: { [name: string]: ByPulse<string>[] };
  line?: ByPulse<string>[];
}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#impl-optional-support
export interface ImplInfo {}

// https://github.com/kshootmania/ksm-chart-format/blob/master/kson_format.md#common-objects
export type ByPulse<T> = [y: Pulse, v: T];

export type ByMeasureIdx<T> = [idx: uint, v: T];

export type GraphValue = [v: number, vf: number];

export type GraphCurveValue = [a: number, b: number];

export type GraphPoint = [
  y: Pulse,
  v: number | GraphValue,
  curve: GraphCurveValue
];

export type GraphSectionPoint = [
  ry: Pulse,
  v: number | GraphValue,
  curve: GraphCurveValue
];

// Additional self-documenting types
export type int = number;
export type uint = number;
export type Pulse = uint;
