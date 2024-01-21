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
      href={`/${skill.id}`}
      className="card bg-white p-4 pb-2 shadow-md rounded text-center"
    >
      <div className="relative">
        <Image
          src={skill.image}
          alt={skill.name}
          width={60}
          height={60}
          className="mx-auto mb-2"
        />
        <svg width="40" height="40" viewBox="0 0 40 40" className="m-auto">
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
        </svg>
      </div>
      <p className="mt-1 font-medium text-lg">{skill.name}</p>
    </Link>
  );
};

export default SkillCard;
