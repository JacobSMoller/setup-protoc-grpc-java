Setup protoc-gen-grpc-java for GitHub Actions
============================

This action will install the java grpc protoc plugin tooling inside of your GitHub Action workflow, making it available on the `$PATH` for use in your workflow build steps.

## Current limitations

The first version of this action will only support linux as thats what was needed at the moment of doing this work.

## Usage

Use this action in a repo with proto definitions that you want to generate to have java grpc stubs.

```yaml
name: Quality control pull requests

on: pull_request

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup protoc
        uses: arduino/setup-protoc@v1
      - name: Install protoc-gen-grpc-java
        uses: JacobSMoller/setup-protoc-grpc-java
      - name: Install buf
        uses: bufbuild/buf-setup-action@v0.6.0
        with:
          github_token: ${{ github.token }}
      - name: Generate protobufs
        run : |
          buf generate

```

### 📥 Inputs

- **version** _(optional)_ - Version of the plugin to use, default is 1.43.2 (Latest at the time of this commit).
