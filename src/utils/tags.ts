const whiteList: string[] = ['/login', '/404']
/**
 * 判断路径是否需要显示在 tags 上
 * @param path
 * @return 如果为 true ，表示需要显示；否则，不需要显示
 */
export const isTags = (path: string): boolean => {
    return !whiteList.includes(path)
}
