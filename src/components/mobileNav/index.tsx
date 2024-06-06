import { signOut } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

export const MobileNav = ({ close }: { close: () => void }) => {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = store.dispatch;
    const router = useRouter();
  
    const handleLogout = () => {
      dispatch(signOut());
      router.push("/");
      close();
    };
  
    return (
      <div
        role="button"
        onClick={close}
        className="fixed inset-0 z-[100] h-full w-full"
      >
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" />
  
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="button"
          className="modal swipeIn absolute right-0 top-0 flex h-full w-[60%] flex-col items-start justify-start rounded-tl-2xl border-l bg-white p-6 shadow-lg sm:w-[300px] transition-all duration-500 ease-out"
        >
          <div className="flex w-full flex-col items-start justify-start gap-y-2">
            <div className="flex w-full items-end justify-end">
              <button type="button" onClick={close} className="">
                <MdClose className="text-xl text-[#0c691f]" />
              </button>
            </div>
            <div className="flex flex-col items-start gap-3 font-rubik">
              <span className="cursor-pointer bg-white rounded-md">
                <Link
                  href={"/dashboard"}
                  onClick={close}
                  className="text-sm sm:text-base"
                >
                  Home
                </Link>
              </span>
              <span className="cursor-pointer">
                <Link
                  href={"/org-requests"}
                  onClick={close}
                  className="text-sm sm:text-base"
                >
                  Organizations
                </Link>
              </span>
              <span className="cursor-pointer">
                <Link
                  href={"/project-requests"}
                  onClick={close}
                  className="text-sm sm:text-base"
                >
                  Projects
                </Link>
              </span>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col gap-16 font-sora font-semibold ">
            {user ? (
              <div
                className="flex justify-center items-center gap-2 font-normal text-red-500 outline outline-1 px-3 py-1 rounded-lg hover:opacity-60"
                onClick={handleLogout}
              >
                <button className="italic">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/login">
                  <button
                    onClick={close}
                    type="button"
                    className="w-full bg-white px-4 py-3 text-lg font-semibold text-[#7780A1] shadow-inner outline outline-1"
                  >
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button
                    onClick={close}
                    type="button"
                    className="w-full bg-[#0c691f] px-4 py-3 text-lg font-semibold text-white shadow-inner"
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };