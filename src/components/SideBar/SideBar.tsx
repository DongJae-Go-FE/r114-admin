"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ReactNode, useContext, useState, createContext } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";

import { ChevronRight, ChevronLeft } from "lucide-react";

import { LOGOUT_CONFIRM_STRING } from "@/lib/const";

import { handleLogout as handleServerLogout } from "@/severActions/serverActions";

type SideBarContextType = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export const SideBarContext = createContext<SideBarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function SideBarContextProvider({ children }: { children: ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleToggle = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <SideBarContext
      value={{
        isOpen: isSideBarOpen,
        setIsOpen: handleToggle,
      }}
    >
      {children}
    </SideBarContext>
  );
}

function SideBarContent({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(SideBarContext);

  const sideBarStyle = `${
    isOpen ? "w-[calc(100%-248px)] ml-[248px]" : "w-full ml-0"
  } transition-[width, margin-left] duration-300 relative h-full overflow-hidden`;

  return <div className={sideBarStyle}>{children}</div>;
}

type MenuItem = { key: string; title: string; children: MenuItem[] };

const MenuAccordion = (props: { items: MenuItem[]; link?: string }) => {
  const pathname = usePathname();

  return (
    <Accordion type="single" collapsible>
      {props.items.map(({ key, title, children }) => {
        const link = `${props.link || ""}/${key}`;

        return children.length ? (
          <AccordionItem key={key} value={key} className="group">
            <AccordionTrigger
              className={`${
                pathname.startsWith(link)
                  ? "text-gray-900 body01b"
                  : "text-gray-600 body01m"
              } flex px-5 py-3`}
            >
              {title}
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <MenuAccordion items={children} link={link} />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Link
            key={key}
            className={`${
              pathname.startsWith(link)
                ? "text-gray-900 body01b group-has-[a]:body02b pointer-events-none"
                : "text-gray-600 body01m group-has-[a]:body02m"
            } block px-5 py-3 border-b last:border-b-0 group-has-[a]:pl-8`}
            href={link}
          >
            {title}
          </Link>
        );
      })}
    </Accordion>
  );
};

function SideBar() {
  const { isOpen, setIsOpen } = useContext(SideBarContext);

  const menu: MenuItem[] = [
    {
      key: "user",
      title: "회원 관리",
      children: [
        {
          key: "member",
          title: "회원 관리",
          children: [],
        },
        {
          key: "contract",
          title: "계약 관리",
          children: [],
        },
        {
          key: "power",
          title: "권한 관리",
          children: [],
        },
      ],
    },
    {
      key: "board",
      title: "게시판 관리",
      children: [
        {
          key: "notice",
          title: "공지사항 관리",
          children: [],
        },
      ],
    },
    {
      key: "advertisement",
      title: "광고 관리",
      children: [
        {
          key: "ad-list",
          title: "광고 목록",
          children: [],
        },
        {
          key: "ad-add",
          title: "광고 등록",
          children: [],
        },
      ],
    },
    {
      key: "setting",
      title: "설정",
      children: [
        {
          key: "management",
          title: "관리자 계정/권한 관리",
          children: [],
        },
        {
          key: "myPage",
          title: "마이페이지",
          children: [],
        },
      ],
    },
  ];

  const sideBarStyle = `w-[248px] h-full bg-white absolute top-0 flex flex-col border-r border-gray-200 ${
    isOpen ? "left-0" : "-left-[248px]"
  } transition-[left] duration-300`;
  const infoLiStyle = "flex gap-x-1";
  const infoParagraphStyle = "truncate max-w-[120px]";

  const handleLogout = async () => {
    if (confirm(LOGOUT_CONFIRM_STRING)) {
      await handleServerLogout();
    }
  };

  return (
    <div
      aria-label="사이트 네비게이션 및 사용자 정보"
      role="navigation"
      className={sideBarStyle}
    >
      <div className="flex items-center justify-center h-[117px] border-b">
        <h1>
          <Link
            className="flex justify-center items-center w-full h-full"
            href="/"
          >
            <Image
              src="/logo.svg"
              alt="로고"
              width={117}
              height={24}
              priority
            />
          </Link>
        </h1>
      </div>
      <div className="w-full h-33 border-b border-gray-200">
        <div className="w-full h-full p-4 body03b">
          <h2>
            <p className="truncate">유저이름유저이름유저이름유저이름유저이름</p>
          </h2>
          <ul className="mt-2">
            <li className={infoLiStyle}>
              메일주소: <p className={infoParagraphStyle}>admin@naver.com</p>
            </li>
            <li className={infoLiStyle}>
              최근 접속시간: <p className={infoParagraphStyle}>2025.01.01</p>
            </li>
            <li className={infoLiStyle}>
              최근 접속시간: <p className={infoParagraphStyle}>2025.01.01</p>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="underline underline-offset-2"
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-364px)] overflow-auto">
        <MenuAccordion items={menu} />
      </div>
      <button
        type="button"
        className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-12 flex justify-center items-center bg-white z-30 rounded-r-sm border border-gray-200 shadow-xs"
        onClick={setIsOpen}
        title={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
      >
        {isOpen ? <ChevronLeft aria-hidden /> : <ChevronRight aria-hidden />}
      </button>
    </div>
  );
}

export { SideBarContent, SideBar };
