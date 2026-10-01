export const FADE_RESTORED_INLINE_STYLES = [
	'opacity:0.8 !important',
	'transition-duration:17ms !important',
].join(';');

export const getFadeActiveInlineStyles = (delayMs: number) => [
	'opacity:0',
	'transition-duration:2000ms !important',
	'transition-timing-function:linear !important',
	`transition-delay:${delayMs}ms !important`,
].join(';');

export const FADE_ACTIVE_INLINE_STYLES = getFadeActiveInlineStyles(200);
