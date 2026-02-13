import { motion } from "motion/react";
import { useMemo } from "react";
const RANDOM_DURATIONS = Array.from({ length: 36 }, () => 20 + Math.random() * 10);


export function FloatingPaths({ position }: { position: number }) {
	const paths = useMemo(
  () =>
    Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C...`, // your path
      color: `rgba(15,23,42,${0.1 + i * 0.03})`,
      width: 0.5 + i * 0.03,
      duration: RANDOM_DURATIONS[i],   // ← now pure & stable
    })),
  [position]
);[position]


	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full text-slate-950 dark:text-white"
				fill="none"
				viewBox="0 0 696 316"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						animate={{
							pathLength: 1,
							opacity: [0.3, 0.6, 0.3],
							pathOffset: [0, 1, 0],
						}}
						d={path.d}
						initial={{ pathLength: 0.3, opacity: 0.6 }}
						key={path.id}
						stroke="currentColor"
						strokeOpacity={0.1 + path.id * 0.03}
						strokeWidth={path.width}
						transition={{
							duration: path.duration,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				))}
			</svg>
		</div>
	);
}