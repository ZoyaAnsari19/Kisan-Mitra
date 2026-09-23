type CategoryItem = { t: string; d: string };
type Category = { h: string; items: CategoryItem[] };

type Props = {
  categories: Category[];
};

/**
 * Stacked accordion — server-rendered, no client JS needed. Each category
 * opens independently via native <details>, same pattern as the FAQ section.
 * First category starts open so the section never looks empty on load.
 */
export function CategoryAccordion({ categories }: Props) {
  return (
    <div className="space-y-3">
      {categories.map((cat, i) => (
        <details key={cat.h} className="category-item glass rounded-2xl overflow-hidden" open={i === 0}>
          <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-gold w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-lg sm:text-xl text-forest">{cat.h}</h3>
            </div>
            <span className="category-plus w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-forest/15 flex items-center justify-center text-forest text-lg shrink-0">+</span>
          </summary>
          <div className="px-5 sm:px-7 pb-6 sm:pb-7 pl-[52px] sm:pl-[68px] space-y-4">
            {cat.items.map((item) => (
              <div key={item.t}>
                <div className="text-forest text-[15px] sm:text-base">{item.t}</div>
                <div className="text-forest/60 text-sm mt-1 leading-relaxed">{item.d}</div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
