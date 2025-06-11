{
  description = "Node.js JavaScript/TypeScript development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            yarn
            deno
            typescript
          ];

          shellHook = ''
            echo "🚀 Node.js development environment loaded!"
            echo "Node version: $(node --version)"
            echo "npm version: $(npm --version)"
            echo "TypeScript version: $(tsc --version)"
            echo "Deno version: $(deno --version)"
            echo ""
            echo "Available tools:"
            echo "  - node, npm, yarn"
            echo "  - typescript, ts-node"
            echo "  - deno (for Deno projects)"
          '';
        };
      }
    );
}
