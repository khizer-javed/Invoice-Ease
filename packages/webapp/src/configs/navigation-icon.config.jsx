import { BsGraphDownArrow } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDangerous } from "react-icons/md";
import { PiTimerLight } from "react-icons/pi";
import {
  RiAdvertisementLine,
  RiEqualizerLine,
  RiSettings5Line,
} from "react-icons/ri";
import { SlWrench } from "react-icons/sl";
import { TbHomeDollar } from "react-icons/tb";
import { VscSettings, VscSettingsGear } from "react-icons/vsc";

const navigationIcon = {
  home: <HiOutlineHome />,
  "home-loan": <TbHomeDollar />,
  "rental-income": <GiReceiveMoney />,
  "repairs-and-maintenance": <SlWrench />,
  "home-office-expenses": <GiPayMoney />,
  "complex-levies": <MdOutlineDangerous />,
  "municipal-rates-and-taxes": <GrMoney />,
  "vacancy-period": <PiTimerLight />,
  "bad-debts": <BsGraphDownArrow />,
  advertising: <RiAdvertisementLine />,
  settings: <VscSettingsGear />,
  viewsetting: <RiEqualizerLine />,
  sitesetting: <VscSettings />,
  accountsetting: <RiSettings5Line />,
  logout: <HiOutlineLogout />,
};

export default navigationIcon;
