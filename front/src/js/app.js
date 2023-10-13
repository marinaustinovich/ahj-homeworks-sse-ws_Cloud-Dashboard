import InstanceWidget from './InstanceWidget/InstanceWidget';
import WorklogWidget from './WorlkogWidget/WorklogWidget';

const container = document.querySelector('.cloud-container');
const instanceWidget = new InstanceWidget(container);
const worklogWidget = new WorklogWidget(container);

instanceWidget.init();
worklogWidget.init();
