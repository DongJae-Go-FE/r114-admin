type TMenu = {
  title: string;
  href?: string;
  items?: TMenu[];
  children?: TMenu[];
};

const HTTPS_HOST_URL = "https://reps.r114.com";

const menus: TMenu[] = [
  {
    title: "대시보드",
    href: "/",
  },
  {
    title: "GIS",
    href: "/gis",
  },
  {
    title: "지역현황",
    items: [
      {
        title: "아파트",
        items: [
          {
            title: "아파트통계",
            children: [
              {
                title: "입주정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000060&chkURL=%2Fris%2Fapt%2Fss_1031_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "가격정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000061&chkURL=%2Fris%2Fapt%2Fss_1032_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "분양정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000066&chkURL=%2Fris%2Fapt%2Fss_1033_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "분양가",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000062&chkURL=%2Fris%2Fapt%2Fss_1033_02.do&lnbHide=&show=M000022`,
              },
              {
                title: "미분양추이",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000063&chkURL=%2Fris%2Fapt%2Fss_1033_03.do&lnbHide=&show=M000022`,
              },
              {
                title: "준공후미분양(공급)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000064&chkURL=%2Fris%2Fapt%2Fss_1033_04.do&lnbHide=&show=M000022`,
              },
              {
                title: "규제지역",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000158&chkURL=%2Fris%2Fapt%2Fss_1034_02.do&lnbHide=&show=M000022`,
              },
              {
                title: "초기분양률",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000173&chkURL=%2Fris%2Fapt%2Fss_1035_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "미분양관리지역",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000174&chkURL=%2Fris%2Fapt%2Fss_1035_02.do&lnbHide=&show=M000022`,
              },
              {
                title: "분양경기실사자수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000175&chkURL=%2Fris%2Fapt%2Fss_1035_03.do&lnbHide=&show=M000022`,
              },
              {
                title: "입주경기실사자수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000176&chkURL=%2Fris%2Fapt%2Fss_1035_04.do&lnbHide=&show=M000022`,
              },
              {
                title: "준공후미분양(부동산R114)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000177&chkURL=%2Fris%2Fapt%2Fss_1035_05.do&lnbHide=&show=M000022`,
              },
              {
                title: "아파트종합지수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000179&chkURL=%2Fris%2Fapt%2Fss_1035_07.do&lnbHide=&show=M000022`,
              },
            ],
          },
          {
            title: "건설사별통계",
            children: [
              {
                title: "건설사별공급",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000140&chkURL=%2Fris%2Fapt%2Fss_8021_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "건설사별가격",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000139&chkURL=%2Fris%2Fapt%2Fss_8022_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "건설사별분양",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000138&chkURL=%2Fris%2Fapt%2Fss_8023_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "지역별공급",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000137&chkURL=%2Fris%2Fapt%2Fss_8024_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "지역별가격",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000136&chkURL=%2Fris%2Fapt%2Fss_8025_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "지역별분양",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000135&chkURL=%2Fris%2Fapt%2Fss_8026_01.do&lnbHide=&show=M000022`,
              },
            ],
          },
          {
            title: "청약통계",
            children: [
              {
                title: "청약통장현황",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000067&chkURL=%2Fris%2Fapt%2Fss_sub_1041_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "청약경쟁률(지역)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000068&chkURL=%2Fris%2Fapt%2Fss_sub_1041_02.do&lnbHide=&show=M000022`,
              },
              {
                title: "청약경쟁률(단지)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000069&chkURL=%2Fris%2Fapt%2Fss_sub_1041_03.do&lnbHide=&show=M000022`,
              },
            ],
          },
          {
            title: "거래량통계",
            children: [
              {
                title: "아파트거래량",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000070&chkURL=%2Fris%2Fapt%2Fss_tr_1051_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "아파트매매거래량",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000071&chkURL=%2Fris%2Fapt%2Fss_tr_1051_02.do&lnbHide=&show=M000022`,
              },
            ],
          },
          {
            title: "실거래통계",
            children: [
              {
                title: "단위당가격",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000072&chkURL=%2Fris%2Fapt%2Fss_ms_1032_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "변동률",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000073&chkURL=%2Fris%2Fapt%2Fss_ms_1032_02.do&lnbHide=&show=M000022`,
              },
              {
                title: "지수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000074&chkURL=%2Fris%2Fapt%2Fss_ms_1032_03.do&lnbHide=&show=M000022`,
              },
              {
                title: "비율분석",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000075&chkURL=%2Fris%2Fapt%2Fss_ms_1032_04.do&lnbHide=&show=M000022`,
              },
              {
                title: "거래건수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000076&chkURL=%2Fris%2Fapt%2Fss_ms_1032_05.do&lnbHide=&show=M000022`,
              },
              {
                title: "거래총액",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000077&chkURL=%2Fris%2Fapt%2Fss_ms_1032_06.do&lnbHide=&show=M000022`,
              },
              {
                title: "거래회전율",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000078&chkURL=%2Fris%2Fapt%2Fss_ms_1032_07.do&lnbHide=&show=M000022`,
              },
              {
                title: "거래분포",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000079&chkURL=%2Fris%2Fapt%2Fss_ms_1032_08.do&lnbHide=&show=M000022`,
              },
              {
                title: "실거래데이터",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000080&chkURL=%2Fris%2Fapt%2Fss_v2_1037_01.do&lnbHide=&show=M000022`,
              },
            ],
          },
          {
            title: "개별상품분석",
            children: [
              {
                title: "단지목록",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000081&chkURL=%2Fris%2Fapt%2Fmr_ss_3021_01.do&lnbHide=&show=M000022`,
              },
              {
                title: "선택단지비교",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000083&chkURL=%2Fris%2Fapt%2Fmr_ss_3023_01.do&lnbHide=&show=M000022`,
              },
            ],
          },
        ],
      },
      {
        title: "수익형상품",
        items: [
          {
            title: "오피스텔",
            children: [
              {
                title: "입주정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000089&chkURL=%2Fris%2Fcommercial%2Fss_1041_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "가격정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000090&chkURL=%2Fris%2Fcommercial%2Fss_1041_02.do&lnbHide=&show=M000023`,
              },
              {
                title: "분양정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000091&chkURL=%2Fris%2Fcommercial%2Fss_1041_03.do&lnbHide=&show=M000023`,
              },
              {
                title: "실거래데이터",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000092&chkURL=%2Fris%2Fcommercial%2Fss_1042_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "단지목록",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000093&chkURL=%2Fris%2Fcommercial%2Fss_mreps_7021_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "선택단지비교",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000095&chkURL=%2Fris%2Fcommercial%2Fss_mreps_7023_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "청약경쟁률(지역)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000161&chkURL=%2Fris%2Fcommercial%2Fss_1043_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "청약경쟁률(단지)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000162&chkURL=%2Fris%2Fcommercial%2Fss_1043_02.do&lnbHide=&show=M000023`,
              },
            ],
          },
          {
            title: "상가",
            children: [
              {
                title: "분양정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000096&chkURL=%2Fris%2Fcommercial%2Fss_1051_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "매물정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000097&chkURL=%2Fris%2Fcommercial%2Fss_1054_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "단지목록",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000098&chkURL=%2Fris%2Fcommercial%2Fss_26023_01.do&lnbHide=&show=M000023`,
              },
            ],
          },
          {
            title: "지식산업센터",
            children: [
              {
                title: "입주정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000099&chkURL=%2Fris%2Fcommercial%2Fss_1081_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "분양정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000100&chkURL=%2Fris%2Fcommercial%2Fss_1081_02.do&lnbHide=&show=M000023`,
              },
              {
                title: "단지목록",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000101&chkURL=%2Fris%2Fcommercial%2Fss_1083_01.do&lnbHide=&show=M000023`,
              },
            ],
          },
          {
            title: "도시형생활주택",
            children: [
              {
                title: "입주정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000102&chkURL=%2Fris%2Fcommercial%2Fss_ur_1011_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "가격정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000103&chkURL=%2Fris%2Fcommercial%2Fss_ur_1011_02.do&lnbHide=&show=M000023`,
              },
              {
                title: "분양정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000104&chkURL=%2Fris%2Fcommercial%2Fss_ur_1011_03.do&lnbHide=&show=M000023`,
              },
              {
                title: "실거래데이터",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000105&chkURL=%2Fris%2Fcommercial%2Fss_ur_1012_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "단지목록",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000106&chkURL=%2Fris%2Fcommercial%2Fss_ur_1013_01.do&lnbHide=&show=M000023`,
              },
            ],
          },
          {
            title: "생활형숙박시설",
            children: [
              {
                title: "단지목록",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000107&chkURL=%2Fris%2Fcommercial%2Fss_acc_1021_01.do&lnbHide=&show=M000023`,
              },
            ],
          },
          {
            title: "산업단지",
            children: [
              {
                title: "산업단지현황",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000156&chkURL=%2Fris%2Fcommercial%2Fss_idst_1031_01.do&lnbHide=&show=M000023`,
              },
              {
                title: "신규/해제",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000157&chkURL=%2Fris%2Fcommercial%2Fss_idst_1031_02.do&lnbHide=&show=M000023`,
              },
            ],
          },
        ],
      },
      {
        title: "통계지표",
        items: [
          {
            title: "인구",
            children: [
              {
                title: "주민등록인구",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000032&chkURL=%2Fris%2Fstat%2Fstat_1010.do&lnbHide=&show=M000021`,
              },
              {
                title: "인구이동",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000031&chkURL=%2Fris%2Fstat%2Fstat_1020_01.do&lnbHide=&show=M000021`,
              },
              {
                title: "인구총조사_5년단위(통계청)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000030&chkURL=%2Fris%2Fstat%2Fstat_1030.do&lnbHide=&show=M000021`,
              },
              {
                title: "인구총조사_1년단위(통계청)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000153&chkURL=%2Fris%2Fstat%2Fstat_1031.do&lnbHide=&show=M000021`,
              },
              {
                title: "인구추계",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000029&chkURL=%2Fris%2Fstat%2Fstat_1040.do&lnbHide=&show=M000021`,
              },
              {
                title: "인구통계(행안부)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000154&chkURL=%2Fris%2Fstat%2Fstat_1050.do&lnbHide=&show=M000021`,
              },
            ],
          },
          {
            title: "주택",
            children: [
              {
                title: "아파트비율",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000042&chkURL=%2Fris%2Fstat%2Fstat_2010.do&lnbHide=&show=M000021`,
              },
              {
                title: "RIP(소득대비 부동산 가격 비율)",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000041&chkURL=%2Fris%2Fstat%2Fstat_2020.do&lnbHide=&show=M000021`,
              },
              {
                title: "부동산 소비심리지수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000040&chkURL=%2Fris%2Fstat%2Fstat_2040.do&lnbHide=&show=M000021`,
              },
              {
                title: "주택구매력지수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000039&chkURL=%2Fris%2Fstat%2Fstat_2050.do&lnbHide=&show=M000021`,
              },
              {
                title: "주택사업경기실사지수",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000038&chkURL=%2Fris%2Fstat%2Fstat_2060.do&lnbHide=&show=M000021`,
              },
            ],
          },
          {
            title: "토지",
            children: [
              {
                title: "지가변동률",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000044&chkURL=%2Fris%2Fstat%2Fstat_3010.do&lnbHide=&show=M000021`,
              },
              {
                title: "토지거래동향",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000043&chkURL=%2Fris%2Fstat%2Fstat_3020.do&lnbHide=&show=M000021`,
              },
            ],
          },
          {
            title: "경제",
            children: [
              {
                title: "가계예금",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000045&chkURL=%2Fris%2Fstat%2Fstat_4030.do&lnbHide=&show=M000021`,
              },
              {
                title: "가계대출금리",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000046&chkURL=%2Fris%2Fstat%2Fstat_4040.do&lnbHide=&show=M000021`,
              },
              {
                title: "가계대출",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000047&chkURL=%2Fris%2Fstat%2Fstat_4050.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
              {
                title: "산업동향",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000048&chkURL=%2Fris%2Fstat%2Fstat_4005.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
              {
                title: "경제활동인구",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000049&chkURL=%2Fris%2Fstat%2Fstat_4010.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
              {
                title: "실업률",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000050&chkURL=%2Fris%2Fstat%2Fstat_4020.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
            ],
          },
          {
            title: "기타",
            children: [
              {
                title: "철도역정보및이용객정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000051&chkURL=%2Fris%2Fstat%2Fstat_5020.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
              {
                title: "학군정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000052&chkURL=%2Fris%2Fstat%2Fstat_5030.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
            ],
          },
        ],
      },
      {
        title: "개발정보",
        items: [
          {
            title: "재건축/재개발",
            children: [
              {
                title: "사업단계별통계",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000129&chkURL=%2Fris%2Fplan%2Fplan_1060.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
              {
                title: "단지정보",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000130&chkURL=%2Fris%2Fplan%2Fplan_1070.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
            ],
          },
        ],
      },
      {
        title: "입주자모집공고",
        items: [
          {
            title: "입주자모집공고",
            children: [
              {
                title: "입주자모집공고",
                href: `${HTTPS_HOST_URL}/sym/mnu/mpm/EgovMainMenuContent.do?menuId=M000183&chkURL=%2Fris%2FibjuNotice%2Fibju_notice.do&lnbHide=&show=M000021%2CM000025%2CM000181`,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default menus;
