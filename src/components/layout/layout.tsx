import { Outlet } from "react-router";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";


export const Layout = () => {
  return (
    <div className="bg-black w-full min-h-dvh">
      <div className="mx-auto w-full border-border/40 min-[1800px]:max-w-[1536px] border-x min-h-dvh">
        <header className="sticky p-5 font-inter border-border/40 border-b flex justify-between items-center">
          <div>
            Mateusz Śpiewak-Siwulski
          </div>
          <div className="flex gap-2">
            <a href="https://www.linkedin.com/in/mateusz-spiewak/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/singerxt" target="_blank" rel="noopener noreferrer">
              <FaGithub/>
            </a>
          </div>
        </header>
        <div className="mb-5"></div>
        <Outlet/>
      </div>
    </div>
  )
}