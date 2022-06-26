export function createPostData(values: any) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  };
}

export function extractProjectId(url: string) {
  // Hard: URL /project/mx0cq16/proses
  // Link: URL /_next/data/development/project/mx0cq16/proses.json?projectId=mx0cq16
  const array = url.split('/');
  array.pop();
  return array.pop() as string;
}
