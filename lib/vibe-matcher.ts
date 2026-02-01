import { CoffeeBean } from './types';
import coffeeDataRaw from '../data/coffee-db.json';

const coffeeData = coffeeDataRaw as CoffeeBean[];

export function getCoffeeByVibe(vibeInput: string): CoffeeBean {
    const normalizedInput = vibeInput.toLowerCase().trim();

    if (!normalizedInput) return coffeeData[0];

    const scoredBeans = coffeeData.map((bean) => {
        let score = 0;

        // 1. Tag Matching (Primary)
        // Using simple substring search which is effective for Japanese without tokenization
        bean.vibe_tags.forEach((tag) => {
            // Direct substring match
            if (normalizedInput.includes(tag.toLowerCase())) {
                score += 15;
            }
            // Exact match bonus
            if (normalizedInput === tag.toLowerCase()) {
                score += 20;
            }
        });

        // 2. Text Matching (Secondary)
        if (normalizedInput.includes(bean.name.toLowerCase()) || normalizedInput.includes(bean.origin.toLowerCase())) {
            score += 20;
        }

        // 3. Description Matching (Tertiary)
        if (bean.description.toLowerCase().includes(normalizedInput) && normalizedInput.length > 2) {
            score += 5;
        }

        // Add some random variance to break ties deterministically but variedly
        const randomJitter = Math.random() * 2;

        return { bean, score: score + randomJitter };
    });

    // Sort by score desc
    scoredBeans.sort((a, b) => b.score - a.score);

    // If match quality is very low, return random to ensure variety rather than always the first one
    if (scoredBeans[0].score < 2) {
        const randomIndex = Math.floor(Math.random() * coffeeData.length);
        return coffeeData[randomIndex];
    }

    return scoredBeans[0].bean;
}

export function getAllTags(): string[] {
    const tags = new Set<string>();
    coffeeData.forEach(bean => {
        bean.vibe_tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
