/**
 * 构建项目索引脚本
 * 读取 content/projects/*.mdx 文件，解析 frontmatter，生成 projects.index.json
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');
const OUTPUT_FILE = path.join(process.cwd(), 'public/data/projects.index.json');

function buildProjectsIndex() {
  console.log('📦 Building projects index...');
  
  // 确保输出目录存在
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 检查项目目录是否存在
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.log('⚠️  Projects directory not found, creating empty index');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ projects: [] }, null, 2));
    return;
  }
  
  // 读取所有 MDX 文件
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.mdx'));
  
  const projects = files.map(filename => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      slug: data.slug || filename.replace('.mdx', ''),
      title: data.title || 'Untitled',
      year: data.year || new Date().getFullYear(),
      client: data.client || '',
      tags: data.tags || [],
      cover: data.cover || '/images/placeholder.jpg',
      images: data.images || [],
      featured: data.featured || false,
      order: data.order || 999,
      // 提取内容摘要（前 200 字符）
      excerpt: content.replace(/^#.*$/gm, '').trim().slice(0, 200) + '...',
    };
  });
  
  // 按 order 排序
  projects.sort((a, b) => a.order - b.order);
  
  // 写入索引文件
  const index = {
    generatedAt: new Date().toISOString(),
    count: projects.length,
    projects,
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  
  console.log(`✅ Generated index with ${projects.length} projects`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);
}

// 执行
buildProjectsIndex();
