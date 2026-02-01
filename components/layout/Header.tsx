import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { BiSolidUserCircle } from "react-icons/bi";
import { GoCircle } from "react-icons/go";

const Header: React.FC = () => {
    return (
        <div className="text-white">
            <div className="flex justify-between items-center gap-6">
                <Link href="/">
                    <Image
                        src={"/icons/logo.png"}
                        width={100}
                        height={100}
                        alt="Logo"
                    />
                </Link>
                <div className="hidden md:flex gap-6 px-3">
                    <Link href="#" className="nav-link">Match of The Day</Link>
                    <Link href="#" className="nav-link">Browse All</Link>
                    <Link href="#" className="nav-link">My Library</Link>
                </div>
                <form action="#" className="hidden md:flex rounded-sm border border-white text-white items-center px-3 py-1 flex-grow max-w-full">
                    <FontAwesomeIcon icon={faSearch} className="w-3 h-3" />
                    <input type="search" placeholder="Search..." className="bg-transparent outline-none ml-1 w-full text-white" />
                </form>
                <div className="flex gap-2">
                    <Link href="#">
                        <span className="relative inline">
                            <GoCircle size={28} className="text-white" />
                            <FontAwesomeIcon icon={faBell} size="xs" className="w-3 h-3 absolute bottom-[9px] left-[7px] text-white" />
                        </span>
                    </Link>
                    <Link href="#"><BiSolidUserCircle size={28} color="white" /></Link>
                </div>
            </div>
            <form action="#" className="md:hidden flex rounded-sm border border-gray-900 text-white items-center px-3 py-1 flex-grow max-w-full">
                <FontAwesomeIcon icon={faSearch} size="xs" />
                <input type="search" placeholder="Search..." className="bg-transparent outline-none ml-1 w-full" />
            </form>
        </div>
    )
}

export default Header;