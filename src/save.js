import { useBlockProps } from '@wordpress/block-editor';

const RenderItem = ({ item, level }) => {
	const tagName = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
	const itemClass =
		level === 1 ? 'tabs_block_item' :
		level === 2 ? 'tabs_block_children_item' :
		'tabs_block_children_2_item';

	return (
		<div className={itemClass}>
			{tagName === 'h2' && <h2>{item.title}</h2>}
			{tagName === 'h3' && <h3>{item.title}</h3>}
			{tagName === 'h4' && <h4>{item.title}</h4>}

			<p>{item.description}</p>

			{item.buttonUrl && (
				<a href={item.buttonUrl} className="button">
					{item.buttonText || 'Button'}
				</a>
			)}

			{item.children && item.children.length > 0 && (
				<div className="children">
					{item.children.map((child) => (
						<RenderItem
							key={child.id}
							item={child}
							level={level + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const save = ({ attributes }) => {
	const { items } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps} className="tabs_block">
			{items.map((item) => (
				<RenderItem key={item.id} item={item} level={1} />
			))}
		</div>
	);
};
