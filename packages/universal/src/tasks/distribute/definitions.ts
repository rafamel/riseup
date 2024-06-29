export interface DistributeParams {
  /** Whether to push repository after publish */
  push?: boolean;
  /** Subdirectory to publish */
  contents?: string | null;
  /** Package registry for publication */
  registry?: string | null;
}
