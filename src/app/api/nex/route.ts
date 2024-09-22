import { join } from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  // Query Django API to increment the download count
  try {
    const incrementResponse = await fetch(process.env.URL_TO_API ?? '');

    if (!incrementResponse.ok) {
      console.error('Failed to increment download count');
    } else {
      console.log('Download count incremented');
    }
  } catch (error) {
    console.error('Error incrementing download count:', error);
  }

  const filePath = join(process.cwd(), 'public/bin/nex'); 

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="nex"',
      },
    });
  } catch (error) {
    console.error('File not found:', error);
    return new Response(JSON.stringify({ message: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}