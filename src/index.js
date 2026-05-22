import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import { save } from './save';
import blockMetadata from '../block.json';

registerBlockType(blockMetadata.name, {
	...blockMetadata,
	edit: Edit,
	save: save,
});
