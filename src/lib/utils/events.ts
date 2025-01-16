import type { SheetData } from '../types/sheets';

export function getRandomEvents(data: SheetData[], count: number = 5): string[] {
  // Filter out empty events and create array of all events
  const allEvents = data
    .map(item => item.eventos)
    .filter((event): event is string => !!event && event.trim() !== '');

  // If we don't have enough events, return all of them
  if (allEvents.length <= count) {
    return allEvents;
  }

  // Get random events
  const randomEvents: string[] = [];
  const usedIndexes = new Set<number>();

  while (randomEvents.length < count && usedIndexes.size < allEvents.length) {
    const randomIndex = Math.floor(Math.random() * allEvents.length);
    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      randomEvents.push(allEvents[randomIndex]);
    }
  }

  return randomEvents;
}