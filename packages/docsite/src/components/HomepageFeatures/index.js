import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Built with Modern Tools',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        FulgensUI leverages the latest React features and PandaCSS for 
        zero-runtime styling, ensuring optimal performance and developer experience.
      </>
    ),
  },
  {
    title: 'Component-Driven Development',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Focus on building features with our pre-built, customizable components. 
        Every component is documented and tested in Storybook.
      </>
    ),
  },
  {
    title: 'Type-Safe and Scalable',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Enjoy full TypeScript support and PandaCSS type safety. Built for teams 
        that need reliable, maintainable UI components at scale.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
