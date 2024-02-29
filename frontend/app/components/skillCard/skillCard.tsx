import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SkilCardProps } from "./skillCard.types";

const SkillCard = ({ skill }: SkilCardProps) => {
  const radius = 18; // 円の半径
  const circumference = 2 * Math.PI * radius; // 円周の長さ
  const progress = skill.progress; // 進捗パーセンテージ

  // 進捗に応じて塗りつぶす長さを計算
  const strokeDasharray = `${
    (circumference * progress!) / 100
  } ${circumference}`;
  return (
    <Link
      href={`/skillBuild/${skill.id}`}
      className="card bg-white p-4 pt-7 shadow-md rounded text-center"
    >
      <div className="flex items-center justify-center gap-10">
        {/* Flexコンテナ */}
        <div className="flex items-center flex-col justify-center">
          {/* 左側のコンテンツ */}
          <Image src={skill.image} alt={skill.name} width={60} height={60} />
          <p className="font-medium text-lg">{skill.name}</p>
        </div>
        <div className="relative">
          <svg width="60" height="60" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke="#eee"
              strokeWidth="4"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke="green" // 進捗に応じた色
              strokeWidth="4"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={circumference}
              transform="rotate(-90 20 20)"
            />
            <text
              x="50%"
              y="50%"
              dy=".3em" // テキストの垂直位置を微調整
              textAnchor="middle" // テキストを中心に揃える
              fill="black" // テキストの色
              fontSize="10" // テキストのサイズ
            >
              {/* {`${progress}%`} */}
              100%
            </text>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;
