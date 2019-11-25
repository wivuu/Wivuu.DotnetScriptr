import * as vscode from 'vscode';

let csInteractive: vscode.Terminal | undefined;

export const register = (context: vscode.ExtensionContext) => {

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

};