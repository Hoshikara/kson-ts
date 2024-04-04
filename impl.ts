import * as kson from "./types";

// Additional self-documenting types
export type int = number;
export type uint = number;
export type Pulse = uint;

export class Chart implements kson.kson {
  version: string = kson.VERSION;
  meta: kson.MetaInfo;
  beat: kson.BeatInfo;
  gauge?: kson.GaugeInfo;
  note?: kson.NoteInfo;
  audio?: kson.AudioInfo;
  camera?: kson.CameraInfo;
  bg?: kson.BGInfo;
  editor?: kson.EditorInfo;
  compat?: kson.CompatInfo;
  impl?: kson.ImplInfo;

  constructor() {
    this.meta = new MetaInfo();
    this.beat = new BeatInfo();
    this.gauge = new GaugeInfo();
    this.note = new NoteInfo();
    this.audio = new AudioInfo();
    this.camera = new CameraInfo();
    this.bg = new BGInfo();
    this.editor = new EditorInfo();
    this.compat = new CompatInfo();
  }
}

export class MetaInfo implements kson.MetaInfo {
  title: string = "";
  title_translit?: string;
  title_img_filename?: string;
  artist: string = "";
  artist_translit?: string;
  chart_author: string = "";
  difficulty: uint | string = 0;
  level: uint = 1;
  disp_bpm: string = "";
  std_bpm?: number;
  jacket_filename?: string;
  jacket_author?: string;
  icon_filename?: string;
  information?: string;
}

export class BeatInfo implements kson.BeatInfo {
  bpm: kson.ByPulse<Pulse>[] = [];
  time_sig: kson.ByMeasureIdx<kson.TimeSig>[] = [[0, [4, 4]]];
  scroll_speed: kson.GraphPoint[] = [[0, [1.0, 1.0], [0.0, 0.0]]];
}

export class GaugeInfo implements kson.GaugeInfo {
  total: uint = 0;
}

export class NoteInfo implements kson.NoteInfo {
  bt?: [
    y: Pulse[] | kson.ButtonNote[],
    y: Pulse[] | kson.ButtonNote[],
    y: Pulse[] | kson.ButtonNote[],
    y: Pulse[] | kson.ButtonNote[]
  ] = [[], [], [], []];
  fx?: [y: Pulse[] | kson.ButtonNote[], y: Pulse[] | kson.ButtonNote[]] = [
    [],
    [],
  ];
  laser?: [kson.LaserSection[], kson.LaserSection[]] = [[], []];
}

export class AudioInfo implements kson.AudioInfo {
  bgm?: kson.BGMInfo;
  key_sound?: kson.KeySoundInfo;
  audio_effect?: kson.AudioEffectInfo;
}

export class BGMInfo implements kson.BGMInfo {
  filename?: string;
  vol: number = 1.0;
  offset: int = 0;
  preview?: kson.BPMPreviewInfo;
  legacy?: kson.LegacyBPMInfo;
}

export class BPMPreviewInfo implements kson.BPMPreviewInfo {
  offset: uint = 0;
  duration: uint = 15000;
}

export class LegacyBPMInfo implements kson.LegacyBPMInfo {
  fp_filenames: string[] = [];
}

export class KeySoundInfo implements kson.KeySoundInfo {
  fx?: kson.KeySoundFXInfo;
  laser?: kson.KeySoundLaserInfo;
}

export class KeySoundFXInfo implements kson.KeySoundFXInfo {
  chip_event: kson.KeySoundInvokeListFX = {};
}

export class KeySoundInvokeFX implements kson.KeySoundInvokeFX {
  vol: number = 1.0;
}

export class KeySoundLaserInfo implements kson.KeySoundLaserInfo {
  vol: kson.ByPulse<number>[] = [[0, 0.5]];
  slam_event?: kson.KeySoundInvokeListLaser;
  legacy?: kson.KeySoundLaserLegacyInfo;
}

export class KeySoundInvokeListLaser implements kson.KeySoundInvokeListLaser {
  slam_up?: kson.Pulse[];
  slam_down?: kson.Pulse[];
  slam_swing?: kson.Pulse[];
  slam_mute?: kson.Pulse[];
}

export class KeySoundLaserLegacyInfo implements kson.KeySoundLaserLegacyInfo {
  vol_auto: boolean = false;
}

export class AudioEffectInfo implements kson.AudioEffectInfo {
  fx?: kson.AudioEffectFXInfo;
  laser?: kson.AudioEffectLaserInfo;
}

export class AudioEffectFXInfo implements kson.AudioEffectFXInfo {
  def?: Record<string, kson.AudioEffectDef>;
  param_change?: Record<string, Record<string, kson.ByPulse<string>[]>>;
  long_event?: [
    Record<string, uint | kson.ByPulse<Record<string, string>>>[],
    Record<string, uint | kson.ByPulse<Record<string, string>>>[]
  ];
}

export class AudioEffectLaserInfo implements kson.AudioEffectLaserInfo {
  def?: Record<string, kson.AudioEffectDef>;
  param_change?: Record<string, Record<string, kson.ByPulse<string>[]>>;
  pulse_event?: Record<string, kson.Pulse[]>;
  peaking_filter_delay: uint = 0;
}

export class CameraInfo implements kson.CameraInfo {
  tilt?: kson.TiltInfo;
  cam?: kson.CamInfo;
}

export class TiltInfo implements kson.TiltInfo {
  scale: kson.ByPulse<number>[] = [[0, 1.0]];
  manual?: kson.ByPulse<kson.GraphSectionPoint[]>[];
  keep: kson.ByPulse<boolean>[] = [[0, false]];
}

export class CamInfo implements kson.CamInfo {
  body?: kson.CamGraphs;
  pattern?: kson.CamPatternInfo;
}

export class CamGraphs implements kson.CamGraphs {
  zoom?: kson.GraphPoint[];
  shift_x?: kson.GraphPoint[];
  rotation_x?: kson.GraphPoint[];
  rotation_z?: kson.GraphPoint[];
  center_split?: kson.GraphPoint[];
}

export class CamPatternInfo implements kson.CamPatternInfo {
  laser?: kson.CamPatternLaserInfo;
}

export class CamPatternLaserInfo implements kson.CamPatternLaserInfo {
  slam_event?: kson.CamPatternLaserInvokeList;
}

export class CamPatternLaserInvokeList
  implements kson.CamPatternLaserInvokeList
{
  spin?: kson.CamPatternInvokeSpin[];
  half_spin?: kson.CamPatternInvokeSpin[];
  swing?: kson.CamPatternInvokeSwing[];
}

export class BGInfo implements kson.BGInfo {
  filename?: string;
  offset: int = 0;
  legacy?: kson.LegacyBGInfo;
}

export class LegacyBGInfo implements kson.LegacyBGInfo {
  bg?: [kson.KSHBGInfo, kson.KSHBGInfo];
  layer?: kson.KSHLayerInfo;
  movie?: kson.KSHMovieInfo;
}

export class KSHMovieInfo implements kson.KSHMovieInfo {
  filename?: string;
  offset: int = 0;
}

export class EditorInfo implements kson.EditorInfo {
  app_name?: string;
  app_version?: string;
  comment?: kson.ByPulse<string>[];
}

export class CompatInfo implements kson.CompatInfo {
  ksh_version?: string;
  ksh_unknown?: kson.KSHUnknownInfo;
}
