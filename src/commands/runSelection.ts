import * as vscode from 'vscode';

let csInteractive: vscode.Terminal | undefined;

export const register = (context: vscode.ExtensionContext) => {

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

            csInteractive.sendText(`dotnet script`);
            csInteractive.sendText("#cls");
            csInteractive.show(true);
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