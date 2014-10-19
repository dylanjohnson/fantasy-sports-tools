Vagrant.configure("2") do |config|
  config.vm.box = "saucy64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/saucy/current/saucy-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.hostname = "mean-dev"
  config.vm.provision "ansible" do |ansible|
    ansible.sudo = true
    ansible.host_key_checking = false
    ansible.playbook = "./provisioning/playbook.yml"
    ansible.verbose = "v"
  end
  config.vm.network "private_network", :ip => "192.168.0.34"
  # config.vm.forward_port 3000, 4567
  config.vm.synced_folder ".", "/vagrant", :nfs => true

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "1536"]
  end
end
