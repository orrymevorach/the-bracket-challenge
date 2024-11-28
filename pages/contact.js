import Form from '@/components/contact/form/form';
import Meta from '@/components/shared/head/head';
import Layout from '@/components/shared/layout/layout';

export default function ContactPage() {
  return (
    <div>
      <Meta title="Contact Us" />
      <Layout>
        <Form />
      </Layout>
    </div>
  );
}
