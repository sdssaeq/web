import "../index.css";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  RiArrowLeftCircleLine,
  RiMenu5Line,
  RiTrophyLine,
  RiHistoryLine,
  RiUserLine,
  RiHome2Line,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import Footer from "./footer";

interface SideProps {
  children: ReactNode;
}

export default function Side({ children }: SideProps) {
  const [first, setfirst] = useState(true);
  return (
    <>
      <div className="flex flex-row gap-4 h-screen relative max-sm:text-sm text-lg overflow-hidden">
        <Sidebar
          collapsed={first}
          collapsedWidth="0px"
          rtl={true}
          width="180px"
        >
          <Menu className="pt-2">
            <MenuItem icon={<RiHome2Line />} component={<Link to="/" />}>
              {" "}
              Home
            </MenuItem>

            <MenuItem
              component={<Link to="/kehadiran" />}
              icon={<RiUserLine />}
            >
              {" "}
              Kehadiran{" "}
            </MenuItem>

            <MenuItem
              component={<Link to="/riwayat" />}
              icon={<RiHistoryLine />}
            >
              {" "}
              Riwayat{" "}
            </MenuItem>

            <MenuItem
              component={<Link to="/ranking" />}
              icon={<RiTrophyLine />}
            >
              {" "}
              Ranking{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
        <div className="pt-2 absolute right-2">
          {first && <RiMenu5Line size={36} onClick={() => setfirst(false)} />}
          {!first && (
            <RiArrowLeftCircleLine size={36} onClick={() => setfirst(true)} />
          )}
        </div>
        <div className="w-full max-lg:pt-0 pt-12">
          {" "}
          {/*flex justify-center items-center */}
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
