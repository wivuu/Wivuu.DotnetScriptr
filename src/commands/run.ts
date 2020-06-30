import * as vscode from 'vscode';

let csInteractive: vscode.Terminal | undefined;

const createInteractiveTerminal = (debug = false) => {
    // Check if terminal has been closed
    if (csInteractive && vscode.window.terminals.indexOf(csInteractive) < 0) {
        csInteractive.dispose();
        csInteractive = undefined;
    }

    // Check if we have a terminal
    if (!csInteractive) {
        const terminalName = "C# Interactive";

        csInteractive = vscode.window.createTerminal({
            name: terminalName,
        });

        csInteractive.sendText(debug ? `dotnet script -d` : `dotnet script`);
        csInteractive.sendText("#cls");
        csInteractive.show(true);
    }

    return csInteractive;
}

const registerRunSelection = (context: vscode.ExtensionContext) => {
    const config = vscode.workspace.getConfiguration("dotnetscriptr");
    const enableDebug = config.get("debug") as boolean;

    let disposable = vscode.commands.registerTextEditorCommand('dotnetscriptr.runSelection', (textEditor, edit) => {
        // Send selection to terminal
        const selection = textEditor.selection;

        let text: string;
        if (selection.isEmpty) {
            text = textEditor.document.lineAt(selection.start.line).text;

            if (config.get("advanceNextLine") === true) {
                const next = new vscode.Position(selection.start.line + 1, 0);

                textEditor.selections = [
                    new vscode.Selection(next, next)
                ];
            }
        }
        else 
            text = textEditor.document.getText(selection);

        createInteractiveTerminal(enableDebug).sendText(text);
    });

    context.subscriptions.push(disposable);
};

const registerRunDocument = (context: vscode.ExtensionContext) => {
    let disposable = vscode.commands.registerTextEditorCommand('dotnetscriptr.runDocument', (textEditor, edit) => {
        // Send entire document to terminal
        const text = textEditor.document.getText();

        createInteractiveTerminal().sendText(text);
    });

    context.subscriptions.push(disposable);
};

export {
    registerRunSelection,
    registerRunDocument
}