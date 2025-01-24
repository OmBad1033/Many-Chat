import { usePathname } from "next/navigation"

export const usePath = () => {
    const pathname = usePathname()
    console.log("pathname", pathname)
    const path = pathname.split("/")
    let page = path[path.length - 1]
    console.log("pageUserPATH", page)
    return {page, pathname}


}