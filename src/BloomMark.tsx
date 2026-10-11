/** A small Flora signature for editorial links and actions. */
export default function BloomMark({ size = 21, className = '' }: { size?: number; className?: string }) {
  return <span className={`bloom-mark ${className}`} style={{ width: size, height: size }} aria-hidden="true" />
}
