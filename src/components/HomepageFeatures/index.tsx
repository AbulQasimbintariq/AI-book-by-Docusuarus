import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AI-Powered Generation',
    Svg: require('@site/static/img/feature-ai.svg').default,
    description: (
      <>
      Leverage AI assistants to automatically generate code from clear specifications.
        Transform your development workflow with intelligent code synthesis powered by neural networks.
      </>
    ),
  },
{
  title: 'Spec-Driven Development',
    Svg: require('@site/static/img/feature-specs.svg').default,
      description: (
        <>
        Write executable specifications instead of code.Your specs become the source of truth,
          ensuring clarity, testability, and maintainability across your entire codebase.
      </>
    ),
},
{
  title: 'Auto-Verified Code',
    Svg: require('@site/static/img/feature-code.svg').default,
      description: (
        <>
        Generated code is automatically validated against your specifications.
        Run tests directly from spec examples to ensure correctness before deployment.
      </>
    ),
},
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className= { clsx('col col--4') } >
    <div className="text--center" >
      <Svg className={ styles.featureSvg } role = "img" />
        </div>
        < div className = "text--center padding-horiz--md" >
          <Heading as="h3" > { title } </Heading>
            < p > { description } </p>
            </div>
            </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className= { styles.features } >
    <div className="container" >
      <div className="row" >
      {
        FeatureList.map((props, idx) => (
          <Feature key= { idx } { ...props } />
          ))
      }
        </div>
        </div>
        </section>
  );
}
