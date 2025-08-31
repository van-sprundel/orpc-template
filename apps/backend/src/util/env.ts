export function getEnv<const T extends readonly string[]>(
	varNames: T,
): { [K in T[number]]: string } {
	const env = {} as { [K in T[number]]: string };

	const missingVarNames: string[] = [];

	for (const varName of varNames) {
		const value = process.env[varName];
		if (value == null) {
			missingVarNames.push(varName);
		} else {
			env[varName as T[number]] = value;
		}
	}

	if (missingVarNames.length > 0) {
		throw new Error(
			`Missing environment variables: ${missingVarNames.join(", ")}`,
		);
	}

	return env;
}
