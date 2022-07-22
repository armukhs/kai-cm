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

export function projectPrefetchLinks(id: string) {
  const words =
    'proses teknologi struktur peran budaya kompetensi lainnya analisis komunikasi sponsorship development';
  const subs = words.split(' ');
  const links: string[] = [`/api/auth/get?subject=project&option=${id}`];
  subs.forEach((s) => {
    if (s == 'analisis') {
      links.push('/api/auth/get?subject=analisis&option=' + id);
    } else if ('komunikasi sponsorship development'.includes(s)) {
      links.push(`/api/auth/get?subject=rencana&option=${s}&extra=${id}`);
    } else {
      links.push(`/api/auth/get?subject=perubahan&option=${s}&extra=${id}`);
    }
  });
  return links;
}

export function simpleCaptcha() {
  const len = 5;
  const max = 10;
  const numbers = '123456789012345678901234567890'.split('').sort(() => Math.random() - 0.5);
  const stack: { value: string; on: boolean }[] = [];
  for (let i = 0; i < max; i++) {
    stack.push({ value: numbers[i], on: i < len });
  }

  let captcha = '';
  stack.sort(() => Math.random() - 0.5);
  for (let i = 0; i < stack.length; i++) {
    if (stack[i].on) captcha += stack[i].value;
  }

  return { captcha, stack };
}
