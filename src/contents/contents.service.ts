import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  private readonly userMapping = {
    'john': 'John Swalobsky',
    'lilly': 'Lilly Maha',
    'bob': 'Bob Typonic'
  };

  private contents: Content[] = [
    {
      id: 1,
      title: 'Ancient Egyptian Civilization',
      content: 'Discover the fascinating world of ancient Egypt, from the pyramids to the pharaohs...',
      author: 'john',  
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      category: 'History',
      time: '2025-05-20T10:00:00Z',
      comments: 2
    },
    {
      id: 2,
      title: 'Modern Fashion Trends',
      content: 'Exploring the latest fashion trends for summer 2025...',
      author: 'lilly',  
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lilly',
      category: 'Fashion',
      time: '2025-05-21T14:30:00Z',
      comments: 1
    },
    {
      id: 3,
      title: 'Health and Wellness Guide',
      content: 'Tips for maintaining a healthy lifestyle in modern times...',
      author: 'bob', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      category: 'Health',
      time: '2025-05-22T09:15:00Z',
      comments: 3
    }
  ];

  private nextId = 4;

  findAll(): Content[] {
    return this.contents.map(content => ({
      ...content,
      author: this.userMapping[content.author] // Convert username to full name for display
    }));
  }

  findOne(id: number): Content {
    const content = this.contents.find(c => c.id === id);
    if (!content) {
      throw new NotFoundException('Post not found');
    }
    return {
      ...content,
      author: this.userMapping[content.author] // Convert username to full name for display
    };
  }

  create(username: string, createContentDto: CreateContentDto): Content {
    const content: Content = {
      id: this.nextId++,
      author: username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      time: new Date().toISOString(),
      comments: 0,
      ...createContentDto
    };
    this.contents.push(content);
    return {
      ...content,
      author: this.userMapping[content.author] // Convert username to full name for display
    };
  }

  update(id: number, username: string, updateContentDto: UpdateContentDto): Content {
    const contentIndex = this.contents.findIndex(c => c.id === id);
    if (contentIndex === -1) {
      throw new NotFoundException('Post not found');
    }

    const content = this.contents[contentIndex];
    if (content.author !== username) {
      throw new UnauthorizedException('You can only update your own posts');
    }

    const updatedContent = {
      ...content,
      ...updateContentDto
    };
    this.contents[contentIndex] = updatedContent;

    return {
      ...updatedContent,
      author: this.userMapping[updatedContent.author] // Convert username to full name for display
    };
  }

  remove(id: number, username: string): void {
    const index = this.contents.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found');
    }

    if (this.contents[index].author !== username) {
      throw new UnauthorizedException('You can only delete your own posts');
    }

    this.contents.splice(index, 1);
  }
}
