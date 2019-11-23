// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// TODO
// - Add automatic keybinding for .csx files to invoke runSelection
// - Helper to check & install dotnet script or prompt user to install it
// - Command to add omnisharp.json stub
// - Command to initialize C# script file?
// - Write readme

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let csInteractive: vscode.Terminal | undefined;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('dotnetscriptr.runSelection', (textEditor, edit) => {
		// The code you place here will be executed every time your command is executed

		// Check if terminal has been closed
		if (csInteractive && vscode.window.terminals.indexOf(csInteractive) < 0) {
			csInteractive.dispose();
			csInteractive = undefined;
		}

		// Check if we have a terminal
		if (!csInteractive) {
			const terminalName = "C# Interactive";

			csInteractive = vscode.window.createTerminal({
				name: terminalName
			});

			csInteractive.show(true);
			csInteractive.sendText(`dotnet script`);
		}

		// Send selection to terminal
		const selection = textEditor.selection;

		let text: string;
		if (selection.isEmpty) {
			text = textEditor.document.lineAt(selection.start.line).text;

			// TODO: Move to next line
		}
		else 
			text = textEditor.document.getText(selection);

		csInteractive.sendText(text);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
