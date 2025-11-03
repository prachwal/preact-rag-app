import { h } from "preact";
import { memo } from "preact/compat"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface CardProps {
  title?: string
  level?: HeadingLevel
  children: preact.ComponentChildren
  className?: string
}

const DynamicHeading = memo(({ level, children }: { level: HeadingLevel; children: preact.ComponentChildren }) => {
  return h(`h${level}`, { className: 'card-title' }, children);
});

export const Card = memo(function Card({ title, level = 2, children, className = '' }: CardProps) {
  return (
    <article class={`card ${className}`}>
      {title && <DynamicHeading level={level}>{title}</DynamicHeading>}
      <div class="card-content">
        {children}
      </div>
    </article>
  )
})
