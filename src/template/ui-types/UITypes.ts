export interface ContainerProps {
  $mb?: number;
  $mt?: number;
  $ml?: number;
  $mr?: number;

  $pl?: number;
  $pt?: number;
  $pv?: number;
  $pb?: number;
  $pr?: number;
  $ph?: number;

  $br?: number;

  $isPointer?: boolean;
  $isRelative?: boolean;

  $heightPX?: number;
  $heightProc?: number;

  $isFitContent?: boolean;

  $widthPX?: number;
  $widthPRC?: number;

  $bg?: string;

  $isFlex?: boolean;

  $borderColor?: string;
  $zIndex?: number;
}
