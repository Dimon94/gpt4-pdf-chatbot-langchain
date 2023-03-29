import styles from '@/styles/loading-dots.module.css';

/**
 * LoadingDots组件
 * @param {string} color - 点的颜色
 * @param {string} style - 组件样式
 * @returns {JSX.Element} LoadingDots组件
 */
const LoadingDots = ({
  color = '#000',
  style = 'small',
}: {
  color: string;
  style: string;
}) => {
  return (
    <span className={style == 'small' ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: 'small',
};
