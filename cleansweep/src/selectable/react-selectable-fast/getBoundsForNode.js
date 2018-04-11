export function getDocumentScroll() {
    const documentScrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
    );

    const documentScrollLeft = Math.max(
        window.pageXOffset,
        document.documentElement.scrollLeft,
        document.body.scrollLeft,
    );

    return { documentScrollTop, documentScrollLeft }
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export default function getBoundsForNode(
    node,
    containerScroll = { scrollTop: 0, scrollLeft: 0 },
) {
    const { scrollTop, scrollLeft } = containerScroll;
    const { documentScrollTop, documentScrollLeft } = getDocumentScroll();
    const rect = node.getBoundingClientRect();

    return {
        top: rect.top + documentScrollTop + scrollTop,
        left: rect.left + documentScrollLeft + scrollLeft,
        offsetWidth: node.offsetWidth,
        offsetHeight: node.offsetHeight,
        computedWidth: rect.width,
        computedHeight: rect.height,
    }
}