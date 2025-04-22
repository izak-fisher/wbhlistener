
export async function completeTaskByAI({dataFromPneumatic}) {
    const pneumaticApiKey = 'g-DvJPOP8dJ9qme2kfQFUzwHGOIZTWDY';
    const headers = {
        'Authorization': `Bearer ${pneumaticApiKey}`,
        'Content-Type': 'application/json',
    }
    const pneumaticEndpoint = `https://api.pneumatic.app/workflows/${dataFromPneumatic.workflow.id}/task-complete`
    //field-b8a9f2 - the task output field
    const systemPromtField = dataFromPneumatic.workflow.kickoff.output.find(output=>output.name === "System prompt")
    const userPromptField = dataFromPneumatic.workflow.kickoff.output.find(output=>output.name === "User prompt")
    let systemPrompt = "none"
    let userPrompt = "none"
    if (systemPromtField) systemPrompt = systemPromtField.value
    if (userPromptField) userPrompt = userPromptField.value
    const payLoad = {
        task_api_name: dataFromPneumatic.workflow.current_task.api_name,
        user_id:4113,
        output: {       
            'field-b8a9f2': `AI response based on ${systemPrompt} and ${userPrompt}`
         }
    }
    const resp = await fetch(pneumaticEndpoint, {method:'POST', headers, body: JSON.stringify(payLoad)})
    return resp
}