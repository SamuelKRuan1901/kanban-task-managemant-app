'use server';

export async function createBoard(formData: FormData) {
  const boardName = formData.get('boardName');
  const columns = formData.get('columns');

  try {
    const res = await fetch('/api/board', {
      method: 'POST',
      body: JSON.stringify({ boardName, columns })
    });
    return JSON.stringify({
      status: res.status,
      data: await res.json()
    });
  } catch (error) {
    return JSON.stringify({ status: 500, error });
  }
}
