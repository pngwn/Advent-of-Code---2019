import { readdirSync } from "fs";
import { spawn, execSync } from "child_process";
import { blue, green, red } from "kleur";
const args = process.argv;

console.clear();
console.log(red("****************************"));
console.log(green(red("******") + green(" ADVENT OF CODE ") + red("******")));
console.log(red("****************************"));

const BASE = `${process.cwd()}/advent`;

if (args[2]) {
	const day_n = (+args[2].replace(/[^0-9]/g, "") + "").padStart(2, "0");
	const day_p = "day-" + day_n + ".js";

	const days = readdirSync(BASE).filter(d => d !== "inputs");

	if (!days.includes(day_p)) {
		console.log(
			blue(
				`\nCould not find an entry for ${day_s}. Maybe that day doesn't exist yet!`
			)
		);
		console.warn(
			`The days completed so far are: ${blue(days.join(", ")).replace(
				".js",
				""
			)}\n`
		);
	} else {
		const day = `${BASE}/${day_p}`;
		run_and_print(day, day_n);
	}
} else {
	const BASE = `${process.cwd()}/advent`;
	const days = readdirSync(BASE).filter(d => d !== "inputs");

	const days_meta = days.map(d => [`${BASE}/${d}`, d.replace(/[^0-9]/g, "")]);

	days_meta.forEach(([day, day_n]) => run_and_print(day, day_n));
}

function run_and_print(day, day_n) {
	console.log(
		`\n  ${blue(
			`DAY ${day_n}\n  --- ${day_n.toString().length === 1 ? "-" : "--"}`
		)}`
	);
	execSync(`node -r esm ${day} | tap-diff`, {
		stdio: ["ignore", "inherit", "inherit"],
		shell: true
	});
}
