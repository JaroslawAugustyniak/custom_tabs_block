import { useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	Popover,
} from '@wordpress/components';
import './editor.scss';

const generateId = () => `item-${Math.random().toString(36).substr(2, 9)}`;

const EditItem = ({ item, level, onUpdate, onDelete, onAddChild }) => {
	const [isLinkOpen, setIsLinkOpen] = useState(false);

	const handleTitleChange = (newTitle) => {
		onUpdate({ ...item, title: newTitle });
	};

	const handleDescriptionChange = (newDescription) => {
		onUpdate({ ...item, description: newDescription });
	};

	const handleButtonTextChange = (newText) => {
		onUpdate({ ...item, buttonText: newText });
	};

	const handleButtonUrlChange = (newUrl) => {
		onUpdate({ ...item, buttonUrl: newUrl });
	};

	const handleLinkChange = (linkData) => {
		if (linkData?.url) {
			handleButtonUrlChange(linkData.url);
		}
		setIsLinkOpen(false);
	};

	const handleChildUpdate = (childIndex, updatedChild) => {
		const newChildren = [...(item.children || [])];
		newChildren[childIndex] = updatedChild;
		onUpdate({ ...item, children: newChildren });
	};

	const handleChildDelete = (childIndex) => {
		const newChildren = item.children.filter((_, idx) => idx !== childIndex);
		onUpdate({ ...item, children: newChildren });
	};

	const handleChildAddChild = (childIndex, newChild) => {
		const newChildren = [...item.children];
		newChildren[childIndex] = {
			...newChildren[childIndex],
			children: [...(newChildren[childIndex].children || []), newChild],
		};
		onUpdate({ ...item, children: newChildren });
	};

	const tagName = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
	const showChildButton = level < 3;

	return (
		<div className={`tabs-item-editor level-${level}`}>
			<div className="tabs-item-controls">
				<RichText
					tagName={tagName}
					value={item.title}
					onChange={handleTitleChange}
					placeholder="Title"
					className="tabs-title"
					allowedFormats={[]}
				/>
				<div className="tabs-description-wrapper">
					<label className="tabs-label">Description</label>
					<RichText
						tagName="p"
						value={item.description}
						onChange={handleDescriptionChange}
						placeholder="Add description..."
						className="tabs-description"
						allowedFormats={['core/bold', 'core/italic', 'core/link']}
					/>
				</div>
				<TextControl
					label="Button Text"
					value={item.buttonText || ''}
					onChange={handleButtonTextChange}
				/>
				<div className="tabs-button-url-wrapper">
					<label className="tabs-label">Button Link</label>
					<div className="tabs-button-url-control">
						<span className="tabs-button-url-display">
							{item.buttonUrl ? item.buttonUrl : 'No link selected'}
						</span>
						<Button
							variant="secondary"
							size="small"
							onClick={() => setIsLinkOpen(true)}
						>
							{item.buttonUrl ? '🔗 Change Link' : '🔗 Select Link'}
						</Button>
						{item.buttonUrl && (
							<Button
								variant="tertiary"
								size="small"
								onClick={() => handleButtonUrlChange('')}
								isDestructive
							>
								Remove
							</Button>
						)}
					</div>
					{isLinkOpen && (
						<Popover onClose={() => setIsLinkOpen(false)}>
							<LinkControl
								value={{ url: item.buttonUrl }}
								onChange={handleLinkChange}
								onRemove={() => {
									handleButtonUrlChange('');
									setIsLinkOpen(false);
								}}
							/>
						</Popover>
					)}
				</div>
				<div className="tabs-actions">
					{showChildButton && (
						<Button
							variant="secondary"
							onClick={() =>
								onAddChild({
									id: generateId(),
									title: 'New Item',
									description: '',
									buttonText: 'Button',
									buttonUrl: '',
									children: level < 2 ? [] : undefined,
								})
							}
						>
							+ Add Child
						</Button>
					)}
					<Button
						variant="tertiary"
						isDestructive
						onClick={onDelete}
					>
						Delete
					</Button>
				</div>
			</div>

			{item.children && item.children.length > 0 && (
				<div className="tabs-children">
					{item.children.map((child, childIndex) => (
						<EditItem
							key={child.id}
							item={child}
							level={level + 1}
							onUpdate={(updated) =>
								handleChildUpdate(childIndex, updated)
							}
							onDelete={() => handleChildDelete(childIndex)}
							onAddChild={(newChild) =>
								handleChildAddChild(childIndex, newChild)
							}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const Edit = ({ attributes, setAttributes }) => {
	const { items } = attributes;
	const blockProps = useBlockProps();

	const handleItemUpdate = (index, updatedItem) => {
		const newItems = [...items];
		newItems[index] = updatedItem;
		setAttributes({ items: newItems });
	};

	const handleItemDelete = (index) => {
		const newItems = items.filter((_, idx) => idx !== index);
		setAttributes({ items: newItems });
	};

	const handleAddItem = () => {
		const newItem = {
			id: generateId(),
			title: 'New Tab',
			description: '',
			buttonText: 'Button',
			buttonUrl: '',
			children: [],
		};
		setAttributes({ items: [...items, newItem] });
	};

	const handleItemAddChild = (itemIndex, newChild) => {
		const newItems = [...items];
		newItems[itemIndex] = {
			...newItems[itemIndex],
			children: [...(newItems[itemIndex].children || []), newChild],
		};
		setAttributes({ items: newItems });
	};

	return (
		<div {...blockProps}>
			<div className="tabs-block-editor">
				<div className="tabs-header">
					<h2>Custom Tabs Block</h2>
					<Button variant="primary" onClick={handleAddItem}>
						+ Add Tab
					</Button>
				</div>

				<div className="tabs-container">
					{items.map((item, index) => (
						<EditItem
							key={item.id}
							item={item}
							level={1}
							onUpdate={(updated) =>
								handleItemUpdate(index, updated)
							}
							onDelete={() => handleItemDelete(index)}
							onAddChild={(newChild) =>
								handleItemAddChild(index, newChild)
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
