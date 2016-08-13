define(['app', 'mockGenerator', 'simulatedServer', 'dataProvider'],
  (app, mockGenerator, simulatedServer, dataProvider) => {
    beforeAll(() => {
      localStorage.clear();
      mockGenerator();
    });

    describe('tests for simulatedServer', () => {
      it('number of user should be 3', () => {
        expect(simulatedServer.getAllUsers().data.length).toBe(3);
      });

      it('number of groups should be 3', () => {
        expect(simulatedServer.getAllGroups().data.length).toBe(3);
      });

      it('number of groups of user: addam_terlson should be 2', () => {
        expect(simulatedServer.getUser('addam_terlson').data.groups.length).toBe(2);
      });
      it('should add a user', () => {
        simulatedServer.addUser('darth_vader', 'Sith Lord', ['developers', 'hr']);
        expect(simulatedServer.getUser('darth_vader').data).not.toBe(null);
        expect(simulatedServer.getUser('darth_vader').data).toEqual({
          username: 'darth_vader',
          role: 'Sith Lord',
          groups: [{
            groupName: 'developers',
            description: 'All Developers'
          }, {
            groupName: 'hr',
            description: 'All Human Resources'
          }]
        });
      });
    });

    describe('tests for dataProvider', () => {
      it('should add a new user', () => {
        const promise = dataProvider.addUser('darth_maul', 'Sith Lord', ['hr']);
        // console.debug(promise);
        promise.done(() => {
          done();
        }).fail((err) => {
          fail(`something wrong happened ${err}`);
        });
      });
    });
  });
