/* eslint-disable unicorn/no-keyword-prefix */
interface ImageProperties {
	src: string
	className?: string
}
export default function Image({
	src,
	className
}: ImageProperties) {
	return <img src={src} alt='' className={className ?? ''} />
}
