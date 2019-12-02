import * as vscode from 'vscode';

let csInteractive: vscode.Terminal | undefined;

const createInteractiveTerminal = () => {
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

    return csInteractive;
}

const registerRunSelection = (context: vscode.ExtensionContext) => {
    let disposable = vscode.commands.registerTextEditorCommand('dotnetscriptr.runSelection', (textEditor, edit) => {
        // Send selection to terminal
        const selection = textEditor.selection;

        let text: string;
        if (selection.isEmpty) {
            text = textEditor.document.lineAt(selection.start.line).text;

            // TODO: Move to next line
        }
        else 
            text = textEditor.document.getText(selection);

        createInteractiveTerminal().sendText(text);
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