import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type TSetArticleState = {
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TSetArticleState) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	const toggleMenuOpen = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleOnChange = (field: keyof ArticleStateType, value: OptionType) => {
		setFormState({ ...formState, [field]: value });
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => {
							handleOnChange('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						title={'размер шрифта'}
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => {
							handleOnChange('fontSizeOption', option);
						}}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => {
							handleOnChange('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => {
							handleOnChange('backgroundColor', option);
						}}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => {
							handleOnChange('contentWidth', option);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
