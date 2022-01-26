const path = require("path");
const fs = require("fs");
const core = require("@actions/core");
const tc = require("@actions/tool-cache");

const cachedFileName = "protoc-gen-grpc-java";
const executableFileName = "protoc-gen-grpc-java";

(async () => {
	try {
		const version = core.getInput("version");
		const platform = ({
			"linux": "linux",
			"darwin": "osx",
		})[process.platform];
		const arch = ({
			"x64": "x86_64",
		})[process.arch];

		if (!platform) {
			core.setFailed(`Unsupported platform '${process.platform}'`)
			return;
		}

		if (!arch) {
			core.setFailed(`Unsupported architecture '${process.arch}'`)
			return;
		}

		let toolPath = await tc.find(executableFileName, version, arch);

		if (!toolPath) {
			toolPath = await download(version, platform, arch);
		}

		fs.chmodSync(path.join(toolPath, executableFileName), '777');
		core.addPath(toolPath);
	} catch (error) {
		core.setFailed(error.message);
	}
})();

async function download(version, platform, arch) {

	const url = `https://search.maven.org/remotecontent?filepath=io/grpc/protoc-gen-grpc-java/${version}/protoc-gen-grpc-java-${version}-${platform}-${arch}.exe`;
	const protocGenGrpcJava = await tc.downloadTool(url);

	return tc.cacheFile(protocGenGrpcJava, cachedFileName, executableFileName, version, arch);
}
